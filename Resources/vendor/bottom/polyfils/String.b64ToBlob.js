if (!String.prototype.b64ToBlob) {
    Object.defineProperty(String.prototype, 'b64ToBlob', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (contentType) {
            var b64String = this;
            if(contentType == "auto"){
                contentType = b64String.split(',')[0].split(':')[1].split(';')[0];
                b64String = b64String.split(',')[1];
            }
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(b64String);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, {type: contentType});
        }
    });
}