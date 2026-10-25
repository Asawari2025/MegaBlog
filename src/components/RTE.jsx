import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <div className="post-content-field">
                        <textarea
                            {...field}
                            className="post-content-input"
                            placeholder="Write a short story (up to 255 characters)..."
                            rows={10}
                            maxLength={255}
                            required
                        />
                        <span className="post-content-count">{field.value?.length || 0}/255</span>
                    </div>
                )}
            />
        </div>
    );
}
