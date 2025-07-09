import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import uuid from 'react-native-uuid';
import { Buffer } from 'buffer';
import supabase from '../../../../supabase';

const uploadImageToSupabase = async (uri, folder = 'default_folder') => {
  try {
    // 📏 1. Görseli yeniden boyutlandır ve sıkıştır
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 500 } }], // 🔧 Daha düşük çözünürlük
      {
        compress: 0.5, // 🔧 Daha yüksek sıkıştırma
        format: ImageManipulator.SaveFormat.JPEG, // 🔧 PNG yerine JPEG
      }
    );

    // 📦 2. Görselin boyutunu kontrol et (opsiyonel)
    const fileInfo = await FileSystem.getInfoAsync(manipulatedImage.uri);
    if (fileInfo.size > 1 * 1024 * 1024) { // 1MB sınırı
      throw new Error('Görsel boyutu 1MB\'dan büyük. Lütfen daha küçük bir görsel yükleyin.');
    }

    // 🔄 3. Base64'e çevir ve buffer hazırla
    const base64File = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const uniqueId = uuid.v4();
    const fileName = `${Date.now()}_${uniqueId}.jpeg`; // .jpeg uzantısı
    const filePath = `${folder}/${fileName}`;
    const buffer = Buffer.from(base64File, 'base64');

    // ☁️ 4. Supabase Storage'a yükle
    const { error: uploadError } = await supabase.storage
      .from('busendenstorage')
      .upload(filePath, buffer, {
        contentType: 'image/jpeg', // 🟡 Değiştirildi
        upsert: false,
      });

    if (uploadError) {

      throw new Error(uploadError.message);
    }

    // 🌍 5. Public URL oluştur ve geri döndür
    const { data } = supabase.storage.from('busendenstorage').getPublicUrl(filePath);
    return data?.publicUrl;
    
  } catch (err) {
    console.error('uploadImageToSupabase error:', err);
    throw err;
  }
};

export default uploadImageToSupabase;



// import * as FileSystem from 'expo-file-system';
// import * as ImageManipulator from 'expo-image-manipulator';
// import uuid from 'react-native-uuid';
// import { Buffer } from 'buffer';
// import supabase from '../../../../supabase';

// const uploadImageToSupabase = async (uri, folder = 'default_folder') => {
//   try {
//     const manipulatedImage = await ImageManipulator.manipulateAsync(
//       uri,
//       [{ resize: { width: 800 } }],
//       { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
//     );

//     const base64File = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const uniqueId = uuid.v4();
//     const fileName = `${Date.now()}_${uniqueId}.png`;
//     const filePath = `${folder}/${fileName}`;

//     const buffer = Buffer.from(base64File, 'base64');

//     const { error: uploadError } = await supabase.storage
//       .from('busendenstorage')
//       .upload(filePath, buffer, {
//         contentType: 'image/png',
//         upsert: false,
//       });

//     if (uploadError) {
//       console.log('Upload error:', uploadError.message);
//       throw new Error(uploadError.message);
//     }

//     const { data } = supabase.storage.from('busendenstorage').getPublicUrl(filePath);
//     return data?.publicUrl;
//   } catch (err) {
//     console.error('uploadImageToSupabase error:', err);
//     throw err;
//   }
// };

// export default uploadImageToSupabase;
