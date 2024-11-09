import torch
import numpy as np

import cv2
from PIL import Image, ImageTk
import vlc

import tkinter as tk
import customtkinter as ctk

app = tk.Tk()
app.geometry("600x600")
app.title("Drowsy")
ctk.set_appearance_mode("dark")


vidframe = tk.Frame(height=480,width=600)
vidframe.pack()
vid = ctk.CTkLabel(vidframe)
vid.pack()

model = torch.hub.load('ultralytics/yolov5', 'custom',)

cap = cv2.VideoCapture(0)
def detect():
    ret,frame = cap.read()
    frame = cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
    results = model(frame)
    img = np.squeeze(results.render())


    imgarr = Image.fromarray(img)
    imgtk = ImageTk.PhotoImage(imgarr)
    vid.imgtk = imgtk
    vid.configure(image=imgtk)
    vid.after(10,detect)


app.mainloop()