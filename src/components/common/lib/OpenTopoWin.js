/**
 * 关联拓扑
 * @param netName 网元名称
 * @param userName 用户名
 */
export default function(netName) {
  let user = ''
  if (sessionStorage.getItem('_USER') !== null) {
    user = sessionStorage.getItem('_USER')
  }
  let url = 'http://10.199.145.35:8080/jksupport_base/jsp/customerinfo/toposwf/HNCircurtTopo.jsp?ssoUserId=' + user;

  let tempForm = document.createElement('form');
  tempForm.id = 'tempForm1';
  tempForm.method = 'post';
  tempForm.action = url;
  tempForm.target = '_blank'; // 在新窗口打开页面

  let hideInput = document.createElement('input');
  hideInput.type = 'hidden';
  hideInput.name = 'ASCRIPT_CIRCUIT_CODE';
  hideInput.value = netName;
  tempForm.appendChild(hideInput);

  document.body.appendChild(tempForm);
  tempForm.submit();
  document.body.removeChild(tempForm);
}
