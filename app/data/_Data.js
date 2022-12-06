import { loadObject } from "../components/LocalStorage"


export const data = [
  {
    key: "bupoer",
    name: "Warung Rames Bu Poer",
    address: "Jl Gelora Indah I, Mangunjaya, Purwokerto Lor, Kec Purwokerto Timur, Kab Banyumas",
    imageUrl: "https://cdn.discordapp.com/attachments/629457937965907979/1049282416721797140/image.png",
    acceptsCustomOrder: false,
    sells: [
      {
        key: "ramesgorengan",
        name: "Nasi Rames + Gorengan",
        price: 8_000,
        imageUrl: "https://adityarizki.net/wp-content/uploads/2019/07/nasi-kendil-1.jpg",
        includes: ["Nasi", "Aneka Sayuran", "1 Gorengan"]
      },
      {
        key: "geprek",
        name: "Ayam Geprek (Tanpa Nasi)",
        price: 10_000,
        imageUrl: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1636519781/gq1wrtke4bsusnwlnl7u.jpg",
        includes: ["Ayam Geprek"]
      },
      {
        key: "nasigeprek",
        name: "Nasi + Ayam Geprek",
        price: 12_000,
        imageUrl: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/6/27/eb2fc775-1d2f-443f-9ef4-0abb0c088e72.jpg",
        includes: ["Nasi", "Ayam Geprek"]
      },
      {
        key: "ramesgeprek",
        name: "Rames + Ayam Geprek",
        price: 14_000,
        imageUrl: "https://cdn-2.tstatic.net/travel/foto/bank/images/ilustrasi-ayam-geprek-enak-di-semarang-untuk-makan-siang.jpg",
        includes: ["Nasi", "Aneka Sayuran", "Ayam Geprek"]
      }
    ]
  },

  {
    key: "busigit",
    name: "Warung Makan Bu Sigit",
    address: "Jl. Mangunjaya, Jatiwinangun, Purwokerto Lor, Kec Purwokerto Timur, Kab Banyumas",
    imageUrl: "https://cdn.discordapp.com/attachments/629457937965907979/1049289426431389717/image.png",
    acceptsCustomOrder: true,
    savedCustomItem: loadObject("@customItem_busigit"),
    sells: [
      {
        key: "soto",
        name: "Soto Ayam",
        price: 12_000,
        imageUrl: "https://cdn-2.tstatic.net/travel/foto/bank/images/sroto-sokaraja.jpg",
        includes: ["Soto Ayam"]
      },
      {
        key: "pecel",
        name: "Pecel",
        price: 12_000,
        imageUrl: "https://asset.kompas.com/crops/etxkCgz_0N5ZbdP6YGJScpobPVk=/60x23:959x622/750x500/data/photo/2020/11/05/5fa3f16d9c1cf.jpg",
        includes: ["Pecel"]
      },
      {
        key: "sopayam",
        name: "Sop Ayam",
        price: 13_000,
        imageUrl: "https://statics.indozone.news/content/2021/12/16/Z8sPDO8/begini-tutorial-membuat-sop-ayam-pak-min78_700.jpg",
        includes: ["Sop Ayam"]
      }
    ],
    customComponents: [
      {
        key: "nasireguler",
        name: "Nasi (Porsi Biasa)",
        price: 2_000,
        imageUrl: "https://m.ftscrt.com/food/35c43c3f-8865-43c9-b046-fdebfc94c270_lg_sq.jpg",
        category: "nasi"
      },
      {
        key: "nasiextra",
        name: "Nasi (Porsi Extra)",
        price: 3_000,
        imageUrl: "https://media.suara.com/pictures/970x544/2016/08/10/o_1apq35dv21v191m1j1a0119o214fva.jpg",
        category: "nasi"
      },
      {
        key: "sayurkacang",
        name: "Sayur Kacang",
        price: 3_000,
        imageUrl: "https://kbu-cdn.com/dk/wp-content/uploads/tumis-kacang-panjang-bumbu-pedas.jpg",
        category: "sayur"
      },
      {
        key: "sayurtahu",
        name: "Sayur Tahu",
        price: 3_000,
        imageUrl: "https://kbu-cdn.com/dk/wp-content/uploads/sayur-tahu.jpg",
        category: "sayur"
      },
      {
        key: "mendoan",
        name: "Mendoan",
        price: 1_000,
        imageUrl: "",
        category: "lauk"
      },
      {
        key: "bakwan",
        name: "Bakwan",
        price: 1_000,
        imageUrl: "https://images.tokopedia.net/img/JFrBQq/2022/8/19/3be3eb1f-e0b1-403e-bd93-e09f12907a48.jpg",
        category: "lauk"
      },
      {
        key: "tahuberontak",
        name: "Tahu Berontak",
        price: 1_000,
        imageUrl: "https://cdn.idntimes.com/content-images/post/20210524/untitled-4d2721dea7a94f79eb5991a7ecc2d5b9.png",
        category: "lauk"
      },
      {
        key: "telurdadar",
        name: "Telur Dadar",
        price: 4_000,
        imageUrl: "",
        category: "lauk"
      },
      {
        key: "ayamgoreng",
        name: "Ayam Goreng",
        price: 6_000,
        imageUrl: "",
        category: "lauk"
      }
    ]
  }
]


export const recommendedTags = []