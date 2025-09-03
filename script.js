const exportFormat = document.getElementById('export-format');
const fileName = document.getElementById('file-name');
const exportButton = document.getElementById('export-button');

exportButton.addEventListener('click', () => {
    if (exportFormat.value === '') {
        alert('선택하세요');
        return;
    }
    if (fileName.value === '' || fileName.value.includes(' ')) {
        alert('파일 이름을 입력하세요(공백 없이)');
        return;
    }
    const file_type = exportFormat.value;
    const filename = fileName.value;

    exportRequest(file_type, filename);
});

exportRequest = async (file_type, filename) => {
    const response = await fetch('https://tickercrawler-production.up.railway.app/export', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ file_type, filename }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
};
