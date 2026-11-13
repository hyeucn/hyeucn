// 입력하신 스프레드시트 아이디
const SHEET_ID = '1SQ1wYkzN02e3MpT6_NXTModAsvLJwA0OT_sQFv_z1Ic';

// 웹 앱 접속 시 HTML 페이지를 렌더링하는 함수
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('탐구보고서 제출 폼')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 폼에서 전달받은 데이터를 스프레드시트에 기록하는 함수
function submitReport(formObject) {
  try {
    const doc = SpreadsheetApp.openById(SHEET_ID);
    const sheet = doc.getActiveSheet();
    
    // 기록할 현재 시간
    const timestamp = new Date();
    
    // 시트에 추가할 데이터 배열 (순서: 시간, 학번, 이름, 주제, 동기, 방법, 결과, 결론)
    const rowData = [
      timestamp,
      formObject.studentId,
      formObject.studentName,
      formObject.topic,
      formObject.motivation,
      formObject.method,
      formObject.result,
      formObject.conclusion
    ];
    
    // 시트의 마지막 행에 데이터 추가
    sheet.appendRow(rowData);
    
    return 'success';
  } catch (error) {
    return 'error: ' + error.toString();
  }
}
