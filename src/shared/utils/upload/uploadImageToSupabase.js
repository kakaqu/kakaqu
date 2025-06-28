import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import uuid from 'react-native-uuid';
import { Buffer } from 'buffer';
import supabase from '../../../../supabase';

const uploadImageToSupabase = async (uri, folder = 'default_folder') => {
  try {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
    );

    const base64File = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const uniqueId = uuid.v4();
    const fileName = `${Date.now()}_${uniqueId}.png`;
    const filePath = `${folder}/${fileName}`;

    const buffer = Buffer.from(base64File, 'base64');

    const { error: uploadError } = await supabase.storage
      .from('busendenstorage')
      .upload(filePath, buffer, {
        contentType: 'image/png',
        upsert: false,
      });

    if (uploadError) {
      console.log('Upload error:', uploadError.message);
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from('busendenstorage').getPublicUrl(filePath);
    return data?.publicUrl;
  } catch (err) {
    console.error('uploadImageToSupabase error:', err);
    throw err;
  }
};

export default uploadImageToSupabase;
