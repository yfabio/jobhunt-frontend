const ButtonsAction = ({
  disabled,
  onCancel,
  btnLeft = "Cancel",
  btnRight = "Save",
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onCancel}
        type="button"
        className="text-slate-700 border rounded w-full py-2 hover:text-white hover:bg-indigo-600">
        {btnLeft}
      </button>
      <button
        disabled={disabled}
        className="bg-black text-white rounded w-full py-2 disabled:opacity-35 disabled:cursor-not-allowed disabled:bg-gray-400 hover:bg-indigo-600 ">
        {btnRight}
      </button>
    </div>
  );
};

export default ButtonsAction;
