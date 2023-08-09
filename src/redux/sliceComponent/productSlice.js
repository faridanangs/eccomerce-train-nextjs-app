import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

// Memanggil data product di dalam api
export const getDataProducts = createAsyncThunk(
  "products/getDataProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });
    const products = await response.json();
    return products.products;
  }
);

// Membuat create entiti untuk menyimpan data products
const productsEntityAdapter = createEntityAdapter({
  selectId: (product) => product.id,
});

// Membuat productsSlice supaya bisa di panggil di store
const productsSliceAll = createSlice({
  name: "products",
  initialState: {
    ...productsEntityAdapter.getInitialState(),
    cart: [],
    pilihan: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getDataProducts.fulfilled, (state, action) => {
      productsEntityAdapter.setAll(state, action.payload);
    });
  },
  reducers: {
    addToCart: (state, action) => {
      let dataSebelum = state.cart.filter((e) => e.id !== action.payload.id);
      let dataSesudah = state.cart.filter((e) => e.id === action.payload.id);
      let jum = dataSesudah.length ? dataSesudah[0]?.count + 0 : 1;
      dataSesudah.length
        ? (dataSesudah[0] = { ...action.payload, count: jum})
        : (dataSesudah = [{ ...action.payload, count: jum}]);
      dataSebelum.push(dataSesudah[0]);
      state.cart = dataSebelum;
    },

    plusCartProduct: (state, action) => {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: Math.min(item.count + 1, item.stock)  }
          : item
      );
      state.cart = updatedCart;

      // Update pilihan juga jika item ada di pilihan
      const updatedPilihan = state.pilihan.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: Math.min(item.count + 1) }
          : item
      );
      state.pilihan = updatedPilihan;
    },

    minCartProduct: (state, action) => {
      const updateProduct = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: item.count - 1 }
          : item
      );

      // ini di jalankan jika nilainya kuurang dari 1
      const updateJikaKurangDariSatu = updateProduct.filter((item) => {
        return item.count >= 1;
      });
      state.cart = updateJikaKurangDariSatu;

      // ini di jalankan jika count < 1 dan di filter kemudian di masuka ke dalam pilihan
      if(updateProduct.find((val)=> val.id === action.payload.id)?.count < 1){
        state.pilihan = state.pilihan.filter((val)=> (
          val.id !== action.payload.id
        ))
      }

      // slice pilihan juga di Update jika item ada di pilihan
      const updatedPilihan = state.pilihan.map((item) =>
        item.id === action.payload.id
          ? { ...item, count: Math.min(item.count - 1) }
          : item
      );
      state.pilihan = updatedPilihan;
    },
    addProdPilihan: (state, action) => {
      let dataPilihanBefore = state.pilihan.filter(
        (e) => e.id !== action.payload.id
      );
      let dataPilihanAfter = state.pilihan.filter(
        (e) => e.id === action.payload.id
      );
      dataPilihanAfter.length
        ? (dataPilihanAfter[0] = { ...action.payload })
        : (dataPilihanAfter = [{ ...action.payload }]);
      dataPilihanBefore.push(dataPilihanAfter[0]);
      state.pilihan = dataPilihanBefore;
    },
    removeProdPilihan: (state, action) => {
      state.pilihan = state.pilihan.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

// export data product slice dan product entiti
export const productsEntity = productsEntityAdapter.getSelectors(
  (state) => state.products
);

// export data reducers
export const {
  addToCart,
  minCartProduct,
  plusCartProduct,
  addProdPilihan,
  removeProdPilihan,
} = productsSliceAll.actions;

// Ini saya panggil di dalam redux/store
export default productsSliceAll.reducer;
