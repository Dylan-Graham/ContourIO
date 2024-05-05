package main

import (
	"log"
)

type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	deregister chan *Client
}

func newHub() *Hub {
	return &Hub{
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		deregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (hub *Hub) run() {
	for {
		select {
		case client := <-hub.register:
			log.Println("New client registered")
			hub.clients[client] = true

			go func() {
				hub.broadcast <- []byte("Welcome new player!")
			}()

		case client := <-hub.deregister:
			if _, ok := hub.clients[client]; ok {
				delete(hub.clients, client)
				log.Println("Client disconnected")
				close(client.send)
				log.Println("Closing their channel...")
			}
		case message := <-hub.broadcast:
			for client := range hub.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(hub.clients, client)
				}
			}
		}
	}
}
