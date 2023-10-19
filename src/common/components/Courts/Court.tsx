import React from 'react'
interface Props {
    number: string
}
const Court: React.FC<Props> = ({ number }) => {
  return (
    <div className="relative border border-solid border-black p-4">
      <h2 className="absolute left-0 top-0">Court {number}</h2>
    </div>
  );
}

export default Court