type MediaElement = "IMAGE" | "VIDEO";
type TextElement = "NOTE" | "TASK";
type ElementType = MediaElement | TextElement;
type Modal = {
  title: string;
  content: "URL" | "Body";
  value: string;
};

// later
// class Component {
//   constructor(private )
// }

window.addEventListener("DOMContentLoaded", () => {
  const MODAL: Modal = { title: "", content: "URL", value: "" };
  const HEADER_BTN_WRAPPER: Element | null = document.querySelector(
    ".header--btns"
  );
  const MODAL_WINDOW: Element | null = document.querySelector(".modal--bg");
  const CLOSE_BTN_WRAPPER: Element | null = document.querySelector(
    ".btn--close"
  );
  const ADD_BTN: Element | null = (MODAL_WINDOW as Element).querySelector(
    ".btn--add"
  );
  const COMPONENT_WRAPPER: Element | null = document.querySelector(
    ".components"
  );

  let clickedBtnType: ElementType | null;

  HEADER_BTN_WRAPPER?.addEventListener("click", (e: Event) => {
    let element = e.target as Element;
    clickedBtnType = element.textContent as ElementType;

    headerBtnClicked(clickedBtnType, MODAL_WINDOW as Element, MODAL);
  });

  CLOSE_BTN_WRAPPER?.addEventListener("click", (e: Event) =>
    switchModal(MODAL_WINDOW as Element)
  );

  (ADD_BTN as Element).addEventListener("click", () => {
    console.log("add Elements");
    addComponent(COMPONENT_WRAPPER as Element, MODAL, COMPONENT); // TODO
    hideModal(MODAL_WINDOW as Element);
  });

  window.addEventListener("click", (e: Event) => {
    let target = e.target as Element;
    if (target.classList.contains("modal-show")) {
      hideModal(MODAL_WINDOW as Element);
    }
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

function addComponent(targetElement: Element, modalData: Modal) {}
