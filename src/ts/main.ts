type MediaElement = "IMAGE" | "VIDEO";
type TextElement = "NOTE" | "TASK";
type ElementType = MediaElement | TextElement;
type Modal = {
  title: string;
  content: "URL" | "Body";
  value: string;
};

window.addEventListener("DOMContentLoaded", () => {
  const MODAL: Modal = { title: "", content: "URL", value: "" };

  let headerBtnWrapper: Element | null = document.querySelector(
    ".header--btns"
  );
  let closeBtnWrapper: Element | null = document.querySelector(".btn--close");
  let clickedBtnType: ElementType | null;
  let modalWindow: Element | null = document.querySelector(".modal--bg");
  let addBtn: Element | null = (modalWindow as Element).querySelector(
    ".btn--add"
  );

  headerBtnWrapper?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    clickedBtnType = element.textContent as ElementType;

    headerBtnClicked(clickedBtnType, modalWindow as Element, MODAL);
  });

  closeBtnWrapper?.addEventListener("click", (e: Event) =>
    switchModal(modalWindow as Element)
  );

  (addBtn as Element).addEventListener("click", () => {
    console.log("add Elements");
    hideModal(modalWindow as Element);
  });
});

function headerBtnClicked(
  clickedBtnType: ElementType,
  modalWindow: Element,
  modal: Modal
): void {
  let newModal: Modal = modal;
  let modalValueLabel: Element | null = document.querySelector(
    ".window--value__label"
  );
  console.log(clickedBtnType);
  switch (clickedBtnType) {
    case "IMAGE":
    case "VIDEO":
      newModal = setModalData(modal, { content: "URL" });
      break;
    case "NOTE":
    case "TASK":
      newModal = setModalData(modal, { content: "Body" });
      break;
    default:
      new Error("Multiple Elements were selected");
  }
  mapModalData(newModal, modalValueLabel as Element);
  switchModal(modalWindow as Element);
}

function setModalData<M>(modal: M, fieldsToUpdate: Partial<M>): M {
  return { ...modal, ...fieldsToUpdate };
}

function mapModalData(data: Modal, modalValueLabel: Element): void {
  modalValueLabel.textContent = data["content"];
}

function switchModal(modalWindow: Element) {
  modalWindow.classList.contains("modal-hide")
    ? showModal(modalWindow)
    : hideModal(modalWindow);
}

function showModal(modalWindow: Element) {
  console.log("showModal");
  modalWindow.classList.remove("modal-hide");
  modalWindow.classList.add("modal-show");
}

function hideModal(modalWindow: Element) {
  console.log("hideModal");
  modalWindow.classList.remove("modal-show");
  modalWindow.classList.add("modal-hide");
}
