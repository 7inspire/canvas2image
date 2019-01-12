/**
 * @file convert canvas to image
 * @auther https://github.com/7inspire/canvas2image
 */

export default {
    /**
     * canvas缩放
     *
     * @param {Object} canvas canvas数据
     * @param {Number} width 缩放后的宽度
     * @return {Number} height 缩放后的高度
     */
    resizeCanvas(canvas, width, height) {
        let w = canvas.width;
        let h = canvas.height;

        width = width || w;
        height = height || w;

        let retCanvas = document.createElement('canvas');
        let retCtx = retCanvas.getContext('2d');
        retCanvas.setAttribute('width', width);
        retCanvas.setAttribute('height', height);
        retCanvas.setAttribute('style', 'width: 100%');
        retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
        return retCanvas;
    },
    /**
     * 触发保存文件
     *
     * @param {Object} data 图片data URI
     * @param {String} fileName 文件名
     */
    saveFile(data, fileName) {
        let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        saveLink.href = data;
        saveLink.download = fileName;

        let event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        saveLink.dispatchEvent(event);
    },
    getDataURL(canvas) {
        return canvas.toDataURL(canvas);
    },
    fixType(type) {
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    },
    /**
     * 将mime-type改为image/octet-stream，强制让浏览器直接download
     *
     * @param {Object} data 图片data URI
     * @param {String} 图片格式
     */
    changeMimeType(data, type = 'png') {
        data = data.replace(this.fixType(type), 'image/octet-stream');
        return data;
    },
    download(canvas, type = 'png') {
        let data = this.getDataURL(canvas);
        data = this.changeMimeType(data, type);
        let fileName = 'baidu_' + (new Date()).getTime() + '.' + type;
        this.saveFile(data, fileName);
    }
};
