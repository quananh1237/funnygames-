<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<title>Chạy JS từ URL theo /lệnh</title>
<style>
  body {background:#111; color:#0f0; font-family: monospace; padding:20px;}
  #console {max-width:800px; margin:auto; border:1px solid #444; padding:10px; background:#000; height:300px; overflow-y:auto; white-space:pre-wrap;}
  #inputArea {margin-top:10px; display:flex;}
  #cmdInput {flex:1; background:#000; color:#0f0; border:1px solid #444; padding:5px; font-family: monospace;}
</style>
</head>
<body>

<h2>💻 Nhập /chạy URL để load & chạy JS</h2>
<div id="console">Gõ /help để xem lệnh.</div>
<div id="inputArea">
  <input id="cmdInput" placeholder="VD: /chạy https://example.com/script.js" />
</div>

<script>
  const consoleDiv = document.getElementById('console');
  const cmdInput = document.getElementById('cmdInput');

  function writeLine(text) {
    consoleDiv.innerText += "\n" + text;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
  }

  function loadAndRunScriptFromURL(url) {
    return new Promise((resolve, reject) => {
      if (!url) {
        reject("Cần URL để chạy script.");
        return;
      }
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve(`✅ Đã load & chạy script từ ${url}`);
      script.onerror = () => reject(`❌ Không tải được script từ ${url}`);
      document.body.appendChild(script);
    });
  }

  async function handleCommand(cmdLine) {
    const parts = cmdLine.trim().split(" ");
    const cmd = parts[0].slice(1);
    const url = parts.slice(1).join(" ");

    if (cmd === "help") {
      return `/help
/chạy <URL>  → load & chạy script JS từ URL
/clear  → xóa console`;
    }

    if (cmd === "clear") {
      consoleDiv.innerText = '';
      return '';
    }

    if (cmd === "chạy") {
      try {
        const msg = await loadAndRunScriptFromURL(url);
        return msg;
      } catch (e) {
        return e;
      }
    }

    return `❌ Không hiểu lệnh: ${cmd}. Gõ /help để xem lệnh.`;
  }

  cmdInput.addEventListener("keypress", async function(e) {
    if (e.key === "Enter") {
      const input = cmdInput.value;
      writeLine(`> ${input}`);
      const response = await handleCommand(input);
      if (response) writeLine(response);
      cmdInput.value = '';
    }
  });
</script>

</body>
</html>
