"use client"
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { get_all, Issue } from "@/lib/api";
import IssuesTable from "@/components/issues-table";
import AddDialog from "@/components/add-dialog";

interface IssuePayload {
    title: String;
    description: String;
}

export default function Home() {
    const [issues, setIssue] = useState<Issue[]>([])

    useEffect(() => {
        get_all().then(
            (data) => {
                setIssue(data);
            });
    }, []);

    function addIssue(issue: Issue): void {
        setIssue((currentIssues: Issue[]) => [...currentIssues, issue]);
    };

    function updateIssue(id: string, payload: IssuePayload) {
        setIssue((currentIssues: Issue[]) => {
            return currentIssues.map(issue => {
                if (issue.id === id) {
                    return { id: issue.id, ...payload }
                }
                return issue
            })
        })
    };

    function deleteIssue(id: string) {
        setIssue((currentIssues: Issue[]) => {
            return currentIssues.filter(issue => issue.id !== id)
        })
    };

    return (
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center mt-24">
                    <Card className="min-w-[458px] mb-6">
                        <CardHeader className="flex justify-end gap-3">
                            <AddDialog onNewIssue={addIssue}/>
                        </CardHeader>
                    </Card>
                    <IssuesTable 
                        issues={issues}
                        onIssueDeleted={deleteIssue}
                        onIssueUpdated={updateIssue}
                    />
                </div>
            </section>
        </main>
    );
}
