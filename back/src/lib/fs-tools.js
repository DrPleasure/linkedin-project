import fs from "fs-extra";

const { createReadStream } = fs;

export const getPostsJSONReadableStream = () => createReadStream(blogPostsJSONPath);
