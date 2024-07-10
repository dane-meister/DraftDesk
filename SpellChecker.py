import re
import tkinter as tk
from tkinter.scrolledtext import ScrolledText

import nltk
from nltk.corpus import words

nltk.download('words')


class SpellCheck:

    def __init__(self):

        self.text = ScrolledText(self.root, font=("Arial", 14), wrap=tk.WORD, width=100, height=20)
        self.text.bind("<KeyRelease>", self.spell_check)
        self.text.pack()

        self.word_list = set(words.words())

        self.old_spaces = 0

        self.root.mainloop()
    

    def spell_check(self, event):
        content = self.text.get("1.0", tk.END)
        space_count = content.count(" ")

        for tag in self.text.tag_names():
            self.text.tag_delete(tag)

        if space_count != self.old_spaces:
            self.old_spaces = space_count
            for word in content.split(" "):
                if re.sub(r"[^\w]", "", word.lower()) not in self.word_list:
                    position = content.find(word)
                    self.text.tag_add(word, f"1.{position}", f"1.{position + len(word)}")
                    self.text.tag_config(word, foreground="red")

if __name__ == "__main__":
    SpellCheck()