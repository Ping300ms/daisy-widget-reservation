import {fetchWorkshops} from "../api/mockServer.ts";
import {useEffect, useState} from "react";
import type {Workshop} from "../api/types.ts";

function Title() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);

    useEffect(() => {
        async function getWorkshops() {
            setWorkshops(await fetchWorkshops());
        }
        getWorkshops();
    }, []);


    return (
        <div>
            {workshops.map((workshop) => (
                <p>{workshop.title}</p>
            ))}
        </div>
    );
}

export default Title;