import { useState } from "react";
import axios from "axios";

export function CreateFriendModal({ onClose }) {
    const [FriendName, setFriendName] = useState("");
    const [FriendEmail, setFriendEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        const payload = {
            name: FriendName,
            email: FriendEmail,
        };

        try {
            const token = localStorage.getItem("token"); // Assuming token is stored here
            const res = await axios.post(
                "https://splititb.harshitacodes.workers.dev/createfriend",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status !== 200) throw new Error(res.data.msg || "Error Adding Friend");

            alert("Friend Added successfully!");
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add Friend</h2>

                <input
                    type="text"
                    placeholder="Friend Name"
                    value={FriendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={FriendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
