package com.ixtx.projectmoviesq.entities;

public class ScreenEntity {
    private int index;
    private int theaterIndex;
    private String name;
    private int seatTotal;
    private byte[] seatsMap;

    public int getIndex() {
        return index;
    }

    public ScreenEntity setIndex(int index) {
        this.index = index;
        return this;
    }

    public int getTheaterIndex() {
        return theaterIndex;
    }

    public ScreenEntity setTheaterIndex(int theaterIndex) {
        this.theaterIndex = theaterIndex;
        return this;
    }

    public String getName() {
        return name;
    }

    public ScreenEntity setName(String name) {
        this.name = name;
        return this;
    }

    public int getSeatTotal() {
        return seatTotal;
    }

    public ScreenEntity setSeatTotal(int seatTotal) {
        this.seatTotal = seatTotal;
        return this;
    }

    public byte[] getSeatsMap() {
        return seatsMap;
    }

    public ScreenEntity setSeatsMap(byte[] seatsMap) {
        this.seatsMap = seatsMap;
        return this;
    }
}
