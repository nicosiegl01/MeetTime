package org.meettime.Model;

public class Matche {
    private Integer selectedId, selectingId, interestId;

    public Matche() {
    }

    public Matche(Integer selectedId, Integer selectingId, Integer interestId) {
        this.selectedId = selectedId;
        this.selectingId = selectingId;
        this.interestId = interestId;
    }

    public Integer getSelectedId() {
        return selectedId;
    }

    public void setSelectedId(Integer selectedId) {
        this.selectedId = selectedId;
    }

    public Integer getSelectingId() {
        return selectingId;
    }

    public void setSelectingId(Integer selectingId) {
        this.selectingId = selectingId;
    }

    public Integer getInterestId() {
        return interestId;
    }

    public void setInterestId(Integer interestId) {
        this.interestId = interestId;
    }
}
