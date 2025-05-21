import { supabase, handleStorageError } from './supabase';
import { toast } from 'sonner';

export const uploadMeditationFile = async (
  file: File,
  type: 'audio' | 'image'
): Promise<{ path: string; error: Error | null }> => {
  try {
    const bucket = type === 'audio' ? 'meditation_audio' : 'meditation_images';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      handleStorageError(uploadError);
      return { path: '', error: uploadError };
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    toast.success('File uploaded successfully');
    return { path: data.publicUrl, error: null };
  } catch (error) {
    handleStorageError(error);
    return { path: '', error: error as Error };
  }
};

export const getMeditationFileUrl = (
  path: string,
  type: 'audio' | 'image'
): string => {
  try {
    const bucket = type === 'audio' ? 'meditation_audio' : 'meditation_images';
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  } catch (error) {
    handleStorageError(error);
    return '';
  }
};

export const deleteMeditationFile = async (
  path: string,
  type: 'audio' | 'image'
): Promise<{ error: Error | null }> => {
  try {
    const bucket = type === 'audio' ? 'meditation_audio' : 'meditation_images';
    
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (deleteError) {
      handleStorageError(deleteError);
      return { error: deleteError };
    }

    toast.success('File deleted successfully');
    return { error: null };
  } catch (error) {
    handleStorageError(error);
    return { error: error as Error };
  }
};