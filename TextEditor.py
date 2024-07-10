import re
import tkinter as tk
from tkinter.scrolledtext import ScrolledText
from tkinter.filedialog import askopenfilename, asksaveasfilename

import nltk
from nltk.corpus import words

nltk.download('words')

class TextEditor:
    current_font = ("Arial", 14) # Default font

    def __init__(self):
        # Main window
        self.root = tk.Tk()
        self.root.title("DraftDesk")
        self.root.rowconfigure(0, minsize=800, weight=1)
        self.root.columnconfigure(1, minsize=800, weight=1)
        
        # Text widget w/ scrolling
        self.text_edit = tk.Text(self.root, font=self.current_font, wrap=tk.WORD)
        self.text_edit.grid(row=0, column=1, sticky="nsew")
        self.text_edit.bind("<KeyRelease>", self.spell_check)

        # Frame for buttons
        self.frame = tk.Frame(self.root, relief=tk.RAISED, bd=2)
        self.save_button = tk.Button(self.frame, text="Save", command=self.save)
        self.open_button = tk.Button(self.frame, text="Open", command=self.open)

        # Layout
        self.save_button.grid(row=0, column=0, sticky="ew", padx=5, pady=5)
        self.open_button.grid(row=1, column=0, sticky="ew", padx=5)
        self.frame.grid(row=0, column=0, sticky="ns")

        # Button hover effect
        self.save_button.bind("<Enter>", lambda event: self.save_button.config(bg="lightblue"))
        self.save_button.bind("<Leave>", lambda event: self.save_button.config(bg="SystemButtonFace"))
        self.open_button.bind("<Enter>", lambda event: self.open_button.config(bg="lightblue"))
        self.open_button.bind("<Leave>", lambda event: self.open_button.config(bg="SystemButtonFace"))

        # Scrollbar
        self.scrollbar = tk.Scrollbar(self.root, command=self.text_edit.yview)
        self.scrollbar.grid(row=0, column=2, sticky="ns")
        self.text_edit.config(yscrollcommand=self.scrollbar.set)

        # Keyboard shortcuts
        self.root.bind("<Control-s>", lambda x: self.save())
        self.root.bind("<Control-o>", lambda x: self.open())

        # Spell checker setup
        self.word_list = set(words.words())
        self.old_spaces = 0

        self.root.mainloop()
    

    # Save file
    def save(self):
        filepath = asksaveasfilename(defaultextension="txt", filetypes=[("Text Files", "*.txt")])

        if not filepath:
            return
        
        with open(filepath, "w") as file:
            content = self.text_edit.get("1.0", tk.END)
            file.write(content)
        self.root.title(f"DraftDesk - {filepath.split('/')[-1]}")
    

    # Open file
    def open(self):
        filepath = askopenfilename(filetypes=[("Text Files", "*.txt")])
        if not filepath:
            return  
        
        with open(filepath, "r") as file:
            content = file.read()
            self.text_edit.delete("1.0", tk.END)
            self.text_edit.insert("1.0", content)

        self.root.title(f"DraftDesk - {filepath.split('/')[-1]}")


    # Spell check method
    def spell_check(self, event):
        content = self.text_edit.get("1.0", tk.END)
        space_count = content.count(" ")

        for tag in self.text_edit.tag_names():
            self.text_edit.tag_delete(tag)

        if space_count != self.old_spaces:
            self.old_spaces = space_count
            for word in content.split():
                clean_word = re.sub(r"[^\w]", "", word.lower())
                if clean_word and clean_word not in self.word_list:
                    position = content.find(word)
                    if position != -1:
                        end_position = position + len(word)
                        self.text_edit.tag_add(word, f"1.{position}", f"1.{end_position}")
                        self.text_edit.tag_config(word, foreground="red")


if __name__ == "__main__":
    TextEditor()