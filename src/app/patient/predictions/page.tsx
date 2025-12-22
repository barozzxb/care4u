"use client";

import { useState, useMemo, useEffect } from "react";
import { SYMPTOMS } from "@/i18n/symptoms";
import { DISEASES } from "@/i18n/disease";
import { ML_URI } from "@/utils/variables";
import { toast } from "react-toastify";
import { Prediction } from "@/types/types";

import { fetchHistory, savePrediction } from "@/services/user/predictIllnessService";
import { formatTime } from "@/utils/functions";
import ModalProvider from "@/components/ModalProvider";
import { Pagination } from "@/components/Pagination";

const symptomKeys = Object.keys(SYMPTOMS);
type SelectedMap = Record<string, number>;

export default function PredictionForm() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<SelectedMap>({});
    const [result, setResult] = useState<string | null>(null);

    const [history, setHistory] = useState<Prediction[]>([]);

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [limit, setLimit] = useState(5);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Prediction>();

    const fetchHistoryData = async () => {
        const { status, message, body } = await fetchHistory(page, 5);
        if (status !== 200)
            toast.error(message);
        setHistory(body.content);
        setTotalPage(body.totalPages);
    }

    useEffect(() => {
        fetchHistoryData();
    }, []);

    const filtered = useMemo(() => {
        const keyword = search.toLowerCase();
        return Object.entries(SYMPTOMS).filter(
            ([_, label]) =>
                label.toLowerCase().includes(keyword)
        );
    }, [search]);

    const toggle = (key: string) => {
        setSelected((prev) => {
            const next = { ...prev };
            if (next[key]) {
                delete next[key];
            } else {
                next[key] = 1;
            }
            return next;
        });
    };

    const submit = async () => {
        if (Object.keys(selected).length === 0) {
            toast.error("Vui lòng chọn ít nhất một triệu chứng trước khi dự đoán.");
            setResult("");
            return;
        }
        const res = await fetch(`${ML_URI}/api/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selected),
        });
        const data = await res.json();
        setResult(data.disease);

        console.log("SAVE PAYLOAD:", {
            datetime: new Date().toISOString(),
            prediction: data.disease,
            symptoms: Object.keys(selected).join(","),
        });
        const pred: Prediction = { datetime: "", prediction: data.disease, symptoms: Object.keys(selected).join(",") };

        const { status, message, body } = await savePrediction(pred);
        if (status !== 201) {
            toast.error(message + ' Kết quả sẽ không được lưu lại');
        }
        fetchHistoryData();
    };

    return (
        <div className="flex flex-col space-y-6 max-w-3xl items-center p-6 border shadow-2xl bg-white rounded-2xl">
            <h1 className="text-2xl font-bold">Hệ thống dự đoán bệnh dựa trên các dấu hiệu</h1>
            <p className="italic">Hệ thống đang phát triển dựa trên mô hình Machine Learning, các kết quả có thể sai lệch</p>

            <div className="flex flex-row w-full border rounded-2xl p-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm triệu chứng (ví dụ: fever, đau đầu...)"
                    className="w-full border border-transparent focus:border-transparent focus:outline-none active:border-transparent active:outline-none"
                />
                <button className="font-black" onClick={() => { setSearch("") }}>X</button>
            </div>


            <div>
                <p className="font-medium mb-2">Triệu chứng phổ biến</p>
                <div className="flex flex-wrap gap-2">
                    {/* {SAMPLE_SYMPTOMS.map((key) => (
                        <button
                            key={key}
                            onClick={() => toggle(key)}
                            className={`px-3 py-1 rounded border
                              ${selected[key]
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100"}`}
                        >
                            {SYMPTOMS[key]}
                        </button>
                    ))} */}
                </div>
            </div>

            {search && (
                <div>
                    <p className="font-medium mb-2">
                        Kết quả tìm kiếm
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-auto">
                        {filtered.map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => toggle(key)}
                                className='px-3 py-2 rounded-lg text-sm border transition-all 
                                        bg-white hover:bg-gray-100 border-gray-300' >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {Object.keys(selected).length > 0 && (
                <div>
                    <p className="font-medium mb-2">Đã chọn</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(selected).map((key) => (
                            <span
                                key={key}
                                className="px-3 py-1 bg-green-100 rounded cursor-pointer"
                                onClick={() => toggle(key)}
                            >
                                {SYMPTOMS[key]} ✕
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={submit}
                className="px-6 py-2 bg-green-600 text-white rounded"
            >
                Dự đoán bệnh
            </button>

            {result && (
                <div className="rounded-xl border border-green-300 bg-green-50 p-4 space-y-2">
                    <p className="text-sm text-green-700">
                        Kết quả dự đoán
                    </p>

                    <p className="text-lg font-semibold text-green-900">
                        {DISEASES[result]}
                    </p>

                    <p className="text-xs text-gray-600">
                        * Kết quả mang tính tham khảo, không thay thế chẩn đoán y tế.
                    </p>
                </div>
            )}
            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6">
                        <p className="font-bold italic text-gray-500">
                            No history found
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Thời gian
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {history.map((item, idx) => (
                                    <tr
                                        key={item.id}
                                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {item.id}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatTime(item.datetime)}
                                        </td>

                                        <td className="px-6 py-4 text-sm">
                                            <button
                                                className="text-blue-600 hover:underline"
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setModalOpen(true);
                                                }}
                                            >
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <Pagination
                    page={page}
                    totalPages={totalPage}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                />
            </div>

            <ModalProvider
                title="Chi tiết lần dự đoán"
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                {selectedItem && (
                    <div className="w-full flex flex-col gap-6">

                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Thời gian dự đoán</span>
                            <span className="font-medium text-gray-700">
                                {formatTime(selectedItem.datetime)}
                            </span>
                        </div>

                        <div className="rounded-xl border border-green-300 bg-green-50 p-4">
                            <p className="text-sm text-green-700 mb-1">
                                Kết quả dự đoán
                            </p>
                            <p className="text-xl font-semibold text-green-900">
                                {DISEASES[selectedItem.prediction] ?? selectedItem.prediction}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Các triệu chứng
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {
                                    selectedItem.symptoms.split(",").map((symptom, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-200"
                                        >
                                            {SYMPTOMS[symptom] ?? symptom}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="text-xs text-gray-500 border-t pt-3">
                            * Kết quả chỉ mang tính tham khảo, không thay thế chẩn đoán y tế.
                        </div>
                    </div>
                )}
            </ModalProvider>

        </div>
    );
}
