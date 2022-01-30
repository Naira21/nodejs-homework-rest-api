import { LocalStorage, FileStorage } from "../../service/storages/index.js";

export const uploadAvatar = async (req, res, next) => {
  const uploadService = new FileStorage(LocalStorage, req.file, req.user);

  const avatarURL = await uploadService.updateAvatar();

  res.status(200).json({
    Status: "200 OK",
    ContentType: "application/json",
    ResponseBody: { avatarURL },
  });
};
