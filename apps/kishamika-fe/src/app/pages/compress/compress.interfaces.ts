export interface CompressedFile {
  compressedFile: File,
  compressedUrl: string,
}

export interface CompressorOptions {
  maxSize: number,
  compressorQuality: number
}
