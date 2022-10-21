import { create, urlSource } from "ipfs-http-client";

const ipfs = create(process.env.REACT_APP_IPFS);
const IPFS_PREFIX = "ipfs://";

export const upload = async (uploadPath) => {
  const file = await ipfs.add(urlSource(uploadPath));
  return file;
};

export const ipfsUpload = async (path) => {
  const uploadResult = await upload(path)
  const uploadResultPath = IPFS_PREFIX + String(uploadResult.cid)
  return uploadResultPath
}
