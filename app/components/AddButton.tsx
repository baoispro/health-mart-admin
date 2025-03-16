import {PlusCircleIcon} from "@heroicons/react/24/outline";

export default function AddButton(props: any) {
    return (
        <button className="cursor-pointer bg-[#0F172A] text-white text-sm font-semibold flex justify-center items-center p-2 rounded-md gap-1 hover:opacity-75">
            <PlusCircleIcon className="w-5"/>{props.title}
        </button>
    );
}