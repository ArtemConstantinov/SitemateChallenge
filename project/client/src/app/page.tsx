"use client"
import { Badge } from "@nextui-org/badge";
// import { title, subtitle } from "@/components/primitives";
import { useEffect, useState } from "react";
import { get_all, Issue } from "@/lib/api";
import IssuesTable from "@/components/issues-table";


export default function Home() {
    const [issues, setIssue] = useState<Issue[]>([])

    useEffect(() => {
        get_all().then(
            (data) => {
                setIssue(data);
                console.log(data);
            });
    }, []);

    return (
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center mt-24">
                    <IssuesTable issues={issues}/>
                    
                    {/* <h1 className={title()}>Augmented</h1>
					<Badge content="DEMO" color="warning" variant="flat" size="sm">
						<h1 className={title({ color: "violet" })}>Talk&nbsp;</h1>
					</Badge>
					<br />
					<h2 className={subtitle({ class: "mt-4" })}>
						Remove the communication barier.
					</h2> */}
                </div>

                {/* <div className="flex gap-3 mt-4">
					<MakeNewTalk>Augment My Talk</MakeNewTalk>
					<Terms />
				</div> */}
            </section>
        </main>
    );
}
