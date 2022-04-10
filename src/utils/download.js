/**
 * 通过创建 a dom 对象方式实现前端文件下载
 * @param href 要下载的内容链接。当定义了 toBlob 时，可以为纯文本或二进制数据(取决于 toBlob 格式
 * @param fileName 下载后的文件名称
 * @param toBlob 如设置该参数，则通过 blob 方式将 href 转换为要保存的文件内容，该参数将入参为 new Blob([href], toBlob) 的第二个参数
 * @example
 * ```js
 * saveAs('abc', 'abc.txt', {});
 * saveAs('data:,Hello%2C%20World!', 'hello.txt');
 * saveAs('https://lzw.me/images/avatar/lzwme-80x80.png', 'lzwme-logo.png');
 * ```
 */
export default function saveAs(href, fileName, toBlob) {
    const isBlob = href instanceof Blob || toBlob;

    if (!fileName && typeof href === 'string' && href.startsWith('http')) {
        fileName = href.slice(href.lastIndexOf('/') + 1);
    }
    fileName = decodeURIComponent(fileName || 'download');

    if (typeof href === 'string' && toBlob) href = new Blob([href], toBlob);
    if (href instanceof Blob) href = URL.createObjectURL(href);

    const aLink = document.createElement('a');
    aLink.setAttribute('href', href);
    aLink.setAttribute('download', fileName);
    aLink.click();
    // const evt = document.createEvent("HTMLEvents");
    // evt.initEvent("click", false, false);
    // aLink.dispatchEvent(evt);

    if (isBlob) setTimeout(() => URL.revokeObjectURL(aLink.href), 100);

    return aLink;
}