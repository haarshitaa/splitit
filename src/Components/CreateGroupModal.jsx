import { useState } from "react";

export function CreateGroupModal({ onClose }) {
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [members, setMembers] = useState([{ name: "", email: "" }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAddMember = () => {
        setMembers([...members, { name: "", email: "" }]);
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError("");

        const payload = {
            name: groupName,
            description,
            image: image || "https://img.com", // Default image if none provided
            members: members.filter(m => m.name && m.email), // Only include valid members
        };

        try {
            const token = localStorage.getItem("token"); // Assuming token is stored here
            const res = await fetch("http://localhost:8787/creategroup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Error creating group");

            alert("Group created successfully!");
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
                <h2 className="text-xl font-bold mb-4">Create Group</h2>

                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3"
                />

                <h3 className="text-lg font-semibold mt-3">Add Members</h3>
                {members.map((member, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Name"
                            value={member.name}
                            onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded"
                        />
                    </div>
                ))}
                <button
                    onClick={handleAddMember}
                    className="text-blue-500 hover:underline mb-3"
                >
                    + Add Another Member
                </button>

                {error && <p className="text-red-500">{error}</p>}

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
