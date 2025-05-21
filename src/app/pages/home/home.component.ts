import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../models/tarefa.model';
import { lstat } from 'fs';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  novaTarefa: string = '';
  listaTarefas: Tarefa[] = [];
  proximoId: number = 1;


  adicionarTarefa() {
    const nomeTarefa = this.novaTarefa.trim();

    if (nomeTarefa) {
      const nova: Tarefa = {
        id: this.proximoId++,
        nome: this.novaTarefa,
        concluida: false
      };

      this.listaTarefas.push(nova);
      this.novaTarefa = '';
    }
  }

  excluirTarefa(id: number) {
    const indice = this.listaTarefas.findIndex(task => task.id === id);
    if (indice !== -1) {
      this.listaTarefas.splice(indice, 1);
    }
  }

  editarTarefa(id: number) {
    const novoNome = prompt('Digite o novo nome da tarefa');
    if (novoNome && novoNome.trim()) {
      for (const tarefa of this.listaTarefas) {
        if (tarefa.id === id) {
          tarefa.nome = novoNome.trim();
        }
      }
    }
  }

  concluirTarefa(id: number) {
    for (const task of this.listaTarefas) {
      if (id == task.id) {
        task.concluida = true;
      }
    }
  }
}
