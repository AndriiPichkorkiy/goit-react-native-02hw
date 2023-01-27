import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const uploadPhotoToServer = async (photo, type) => {
  const response = await fetch(photo);

  const file = await response.blob();

  const uniquePostId = Date.now().toString() + (Math.random() + "").slice(2);

  const storage = getStorage();
  const path = type === "post" ? "postImage" : "avatarImage";

  const storageRef = ref(storage, `${path}/${uniquePostId}`);

  try {
    await uploadBytes(storageRef, file);

    const adress = await getDownloadURL(
      ref(storage, `${path}/${uniquePostId}`)
    );

    return adress;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`errorCode: ${errorCode}, errorMessage: ${errorMessage}`);
  }
};

export default uploadPhotoToServer;
