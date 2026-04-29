import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import { EditableSongList } from "../src/components/EditableSongList";

describe("EditableSongList", () =>  {
    test("adds a song", () => {
        const setSongs = jest.fn();
        render (<EditableSongList songs = {[]} setSongs = {setSongs} />);
        const addButton = screen.getByText("Add Song");
        fireEvent.click(addButton);
        expect(setSongs).toHaveBeenCalledWith([""]);
    });

    test("edits a song", () => {
        const setSongs = jest.fn();
        render (<EditableSongList songs = {["Old Song"]} setSongs = {setSongs}/>);
        const input = screen.getByDisplayValue("Old Song");
        fireEvent.change(input, { target: {value: "New Song"}});
        expect(setSongs).toHaveBeenCalledWith(["New Song"]);
    });

    test("deletes a song", () => {
        const setSongs = jest.fn();
        render (<EditableSongList songs = {["Song 1", "Song 2"]} setSongs = {setSongs} />);
        const deleteButtons = screen.getAllByText("❌");
        fireEvent.click(deleteButtons[0]);
        expect(setSongs).toHaveBeenCalledWith(["Song 2"]);
    })
});
