import StringConstants from "product/constants/StringConstants";
import Picker from "./Picker";
import PrimaryButton from "./PrimaryButton";

const Filter = ({ filterProps, handleFilterButtonClick, isFilterable }) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {filterProps.map((filter, index) => (
                    <div key={index} style={{ marginRight: '20px' }}>
                        <Picker
                            title={filter.title}
                            items={filter.items}
                            onChange={filter.onChange}
                            selected={filter.selected}
                            multipleSelection={filter.multipleSelection}
                            isCollapsible={false}
                        />
                    </div>
                ))}
            </div>
            <div>
                <PrimaryButton
                    title={StringConstants.SUBMIT}
                    onClick={handleFilterButtonClick}
                    isEnabled={isFilterable()}
                    style={{ marginTop: '30px' }}
                />
            </div>
        </div>
    );
};

export default Filter;