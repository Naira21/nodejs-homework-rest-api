import {
  LocalStorage,
  CloudStorage,
  FileStorage,
} from "../../service/storages/index.js";

const uploadAvatar = async (req, res, next) => {
  const uploadService = new FileStorage(LocalStorage, req.file, req.user);

  const avatarURL = await uploadService.updateAvatar();

  res.status(200).json({
    Status: "200 OK",
    ContentType: "application/json",
    ResponseBody: { avatarURL },
  });
};
export default uploadAvatar;
