import { DocumentArrowDownIcon} from "@heroicons/react/24/outline";

export default function ExportButton() {
    return (
        <button className="cursor-pointer bg-white flex justify-center items-center p-2 rounded-md text-sm font-semibold gap-1 hover:bg-[#e5e7eb] border-1 border-[#e5e7eb]">
            <DocumentArrowDownIcon className="w-5"/> Export
        </button>
    );
}