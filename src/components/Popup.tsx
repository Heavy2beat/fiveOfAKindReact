export function Popup() {
  return (
    <div
      className="fixed left-0 top-0 z-40 h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalScrollable"
      aria-labelledby="exampleModalScrollableLabel"
      aria-hidden="true"
    >
      <div className="pointer-events-none relative mx-auto my-6 w-auto max-w-lg sm:h-[calc(100%-3rem)]">
        <div className="pointer-events-auto relative flex max-h-full w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 p-4">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalScrollableLabel"
            >
              Modal title
            </h5>
            <button
              type="button"
              className="btn-close box-content h-4 w-4 rounded-none border-none p-1 text-black opacity-50 hover:text-black hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="relative flex-auto overflow-y-auto p-4">
            <p>
              This is some placeholder content to show the scrolling behavior
              for modals. We use repeated line breaks to demonstrate how content
              can exceed minimum inner height, thereby showing inner scrolling.
              When content becomes longer than the predefined max-height of
              modal, content will be cropped and scrollable within the modal.
            </p>
            <p>This content should appear at the bottom after you scroll.</p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4">
            <button
              type="button"
              className="inline-block rounded bg-purple-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="ml-1 inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
