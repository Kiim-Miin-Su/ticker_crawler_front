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

    let filename = fileName.value;
    if (filename.includes(' ') || filename.includes('.')) {
        alert('파일 이름에 공백이나 점이 있습니다');
        return;
    }
    if (exportFormat.value === 'excel' && !filename.endsWith('.xlsx')) {
        filename += '.xlsx';
    }
    if (exportFormat.value === 'csv' && !filename.endsWith('.csv')) {
        filename += '.csv';
    }
    const file_type = exportFormat.value;

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
    if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        alert("서버 오류");
        return;
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
};