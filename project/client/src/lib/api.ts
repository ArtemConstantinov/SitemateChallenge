export type Issue = {
    id: String;
    title: String;
    description: String;
}

export interface IssuePayload {
    title: String;
    description: String;
}

export type StatusResponse = {
    item_id: string;
    success: boolean;
}

const BASE_URL = "https://localhost/api";


export async function get_all(): Promise<Issue[]> {
    const res = await fetch(`${BASE_URL}/issues`);
    if (!res.ok) {
        return []
    }
    return await res.json();
}


export async function get_issue(id: String): Promise<Issue | null> {
    const res = await fetch(`${BASE_URL}/issues/${id}`);
    if (!res.ok) {
        return null
    }
    return await res.json();
}


export async function create_issue(payload: IssuePayload): Promise<Issue | null> {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const res = await fetch(`${BASE_URL}/issues`, options);
    if (!res.ok) {
        return null
    }
    return await res.json();
}


export async function update_issue(id: string, payload: IssuePayload): Promise<StatusResponse> {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const res = await fetch(`${BASE_URL}/issues/${id}`, options);
    if (!res.ok) {
        return {
            "item_id": id,
            "success": false
        }
    }
    return await res.json();
}


export async function delete_issue(id: string): Promise<StatusResponse> {
    const options = {
        method: "DELETE",
    };
    const res = await fetch(`${BASE_URL}/issues/${id}`, options);
    if (!res.ok) {
        return {
            "item_id": id,
            "success": false
        }
    }
    return await res.json();
}