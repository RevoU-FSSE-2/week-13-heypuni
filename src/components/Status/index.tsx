import { useMemo } from "react"

interface Props {
    status: number;
}

const Status = ( { status }: Props ) => {

    const activeStatus = useMemo(() => {
        if(status === 1) {
            return 'Active'
        }

      return 'Deactive'
    }, [status])

    return (
        <>
            <p>{activeStatus}</p>
        </>
    )
}

export default Status