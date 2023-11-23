const Input = ({ id, label, placeholder, changeHandler }) => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                className="input input-bordered w-full max-w-xs"
                onChange={changeHandler}
            />
        </div>
    );
};

export default Input;
