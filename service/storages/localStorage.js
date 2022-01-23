import path from "path";
import fs from "fs/promises";
import {} from "dotenv/config";
import { updateAvatar } from "../../model/users/index.js";

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filename = file.filename;
    this.filePath = file.path;
    this.avatarsFolder = process.env.AVATARS_FOLDER;
  }
  async save() {
    const destination = path.join(this.avatarsFolder, this.userId);
    await fs.mkdir(destination, { recursive: true });
    await fs.rename(this.filePath, path.join(destination, this.filename));
    const avatarUrl = path.normalize(path.join(this.userId, this.filename));
    await updateAvatar(this.userId, avatarUrl);
    return avatarUrl;
  }
}

export { LocalStorage };
