type MediaBtn = "IMAGE" | "VIDEO";
type TextBtn = "NOTE" | "TASK";
type AddBtn = MediaBtn | TextBtn;

let headerBtnWrapper = document.querySelector(".header--btns");
let clickedBtnText: AddBtn | null;

headerBtnWrapper?.addEventListener("click", (e: Event) => {
  let element = e.target as Element;
  clickedBtnText = element.textContent as AddBtn;
  addElement(clickedBtnText);
});

function addElement(el: AddBtn) {
  console.log(typeof el);
}
