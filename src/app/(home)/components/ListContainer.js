const ListContainer = ({ getData, clickedItemsList }) => {
  return (
    <div className="w-[calc(350px+4vw)] h-full border-l-2 border-black">
      {getData.map((value, index) => {
        return (
          <div key={index}>
            {value.visible && (
              <>
                <div className="w-full border-b-2 border-black py-2 px-2">
                  <div>{value.name}</div>
                  {clickedItemsList.some((v) => v === value.id) && <div>{value.description}</div>}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListContainer;
