import ProductManager from "./models/Manager/product_manager.js";
const manager = new ProductManager();

const sampleProducts = [
  {"id":"1","name":"Mochi Truyền Thống","price":14000,"quantity":60, "description": "Mochi truyền thống Nhật Bản, mềm dẻo với nhân ngọt thanh."},
  {"id":"2","name":"Mochi Dâu","price":18000,"quantity":45, "description": "Mochi nhân dâu tây tươi mát, hương vị ngọt ngào."},
  {"id":"3","name":"Mochi Trà Xanh","price":18000,"quantity":30, "description": "Mochi hương trà xanh matcha thơm lừng, nhân ngọt dịu."},
  {"id":"4","name":"Mochi Chocolate","price":20000,"quantity":24, "description": "Mochi vỏ mềm nhân chocolate đắng ngọt hấp dẫn."},
  {"id":"5","name":"Mochi Xoài","price":19000,"quantity":36, "description": "Mochi nhân xoài chín vàng, hương thơm nhiệt đới."},
  {"id":"6","name":"Mochi Phô Mai","price":16000,"quantity":75, "description": "Mochi nhân phô mai béo ngậy, tan chảy trong miệng."},
  {"id":"7","name":"Mochi Vani","price":15000,"quantity":54, "description": "Mochi hương vani thơm dịu, nhân ngọt thanh lịch."},
  {"id":"8","name":"Mochi Việt Quất","price":20000,"quantity":30, "description": "Mochi nhân việt quất chua ngọt, màu sắc bắt mắt."},
  {"id":"9","name":"Mochi Kem Sữa","price":14500,"quantity":42, "description": "Mochi nhân kem sữa mát lạnh, hương vị quen thuộc."},
  {"id":"10","name":"Mochi Đậu Đỏ","price":14000,"quantity":60, "description": "Mochi nhân đậu đỏ truyền thống, ngọt bùi đậm đà."},
  {"id":"11","name":"Mochi Matcha Socola","price":21000,"quantity":27, "description": "Mochi hương matcha kết hợp cùng nhân socola độc đáo."},
  {"id":"12","name":"Mochi Chuối","price":17000,"quantity":33, "description": "Mochi nhân chuối chín thơm, ngọt tự nhiên."},
  {"id":"13","name":"Mochi Kem Dừa","price":19000,"quantity":39, "description": "Mochi nhân kem dừa béo thơm, hương vị miền nhiệt đới."},
  {"id":"14","name":"Mochi Caramen","price":18000,"quantity":48, "description": "Mochi nhân caramen ngọt ngào, chút đắng nhẹ quyến rũ."},
  {"id":"15","name":"Mochi Kiwi","price":19500,"quantity":21, "description": "Mochi nhân kiwi chua ngọt, mang lại cảm giác tươi mới."},
  {"id":"16","name":"Mochi Táo Xanh","price":18500,"quantity":30, "description": "Mochi nhân táo xanh giòn ngọt, hương thơm dịu nhẹ."},
  {"id":"17","name":"Mochi Socola Trắng","price":20500,"quantity":15, "description": "Mochi vỏ mềm nhân socola trắng ngọt ngào."},
  {"id":"18","name":"Mochi Phúc Bồn Tử","price":21000,"quantity":18, "description": "Mochi nhân phúc bồn tử chua thanh, hương thơm đặc trưng."},
  {"id":"19","name":"Mochi Khoai Môn","price":17500,"quantity":36, "description": "Mochi nhân khoai môn bùi béo, hương vị truyền thống."},
  {"id":"20","name":"Mochi Đậu Phộng","price":16000,"quantity":42, "description": "Mochi nhân đậu phộng rang thơm, giòn bùi hấp dẫn."}
];

async function seed() {
  for (let i = 0; i < sampleProducts.length; i++) {
    const product = sampleProducts[i];
    await manager.add(product.id, product.name, product.price, product.quantity, product.description);
    console.log(`Inserted: ${(await manager.findById(product.id)).name}`);
  }
  console.log('✅ All products inserted.');
}

seed();

