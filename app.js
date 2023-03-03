function attachEvents() {
  document.querySelector("#submit").addEventListener("click", addComment);
  document
    .querySelector("#refresh")
    .addEventListener("click", displayAllComments);
}
const url = "http://localhost:3030/jsonstore/messenger";

function addComment() {
    const name = document.querySelector('[name="author"]')
    const messageText = document.querySelector('[name="content"]')
    if(!name.value || !messageText.value) return

    fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            author: name.value.trim(),
            content: messageText.value.trim()
        })
    }).then(res => {
        if(!res.ok) throw new Error('Error')
        return res.json()
    }).catch(e => alert(e.message))

}

function displayAllComments() {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Error");
      return res.json();
    }).then(addCommentToTextArea).catch((e) => alert(e.message));
}

function addCommentToTextArea(data) {
  const textArea = document.querySelector("#messages");
  const allComments = [];
  Object.values(data).forEach((c) => allComments.push(`${c.author}: ${c.content}`));
  textArea.value = allComments.join("\n");
}


attachEvents();
