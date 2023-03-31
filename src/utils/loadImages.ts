/**
 * 加载所有本地图片类
 */
import goodStorage from 'good-storage'

export class LoadImages {
  public static imageList: Record<string, string> = {}

  static getImage(path: string) {
    return LoadImages.imageList[path]
  }

  static cacheImages() {
    this.imageList = goodStorage.get('imageList') || {}
    if (!this.isEmpty(this.imageList)) {
      this.loadAllImages()
      goodStorage.set('imageList', this.imageList)
    }
  }

  static isEmpty(obj: any) {
    return Object.getOwnPropertyNames(obj).length
  }

  static loadAllImages() {
    const imagesMap = import.meta.glob<Record<string, any>>('../assets/img/**/*.png', {
      eager: true
    })

    let relativePath = ''
    for (const key in imagesMap) {
      relativePath = key.substring(key.lastIndexOf('/') + 1)
      this.imageList[relativePath] = imagesMap[key].default
    }
  }
}

export default LoadImages.getImage
