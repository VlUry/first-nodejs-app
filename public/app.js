document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => e.target.closest("li").remove());
  }

  if (e.target.dataset.type === "edit") {
    const title = prompt("Enter new title");
    if (title) {
      const id = e.target.dataset.id;
      edit(id, { title: title.trim() }).then(
        () => (e.target.closest("li").firstElementChild.innerHTML = title)
      );
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, payload) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
